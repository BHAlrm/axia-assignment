/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const pkg = require('../package.json');

/**
 * Webpack Plugins
 *
 * problem with copy-webpack-plugin
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const SplitChunksPlugin = require('webpack/lib/optimize/SplitChunksPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
const BomPlugin = require('webpack-utf8-bom');

const buildUtils = require('./build-utils');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  const isProd = options.env === 'production';
  const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, options.metadata || {});
  const ngcWebpackConfig = buildUtils.ngcWebpackSetup(isProd, METADATA);
  const supportES2015 = buildUtils.supportES2015(METADATA.tsConfigPath);

  const entry = {
    polyfills: helpers.root('src', 'polyfills.browser.ts'),
    main: helpers.root('src', 'main.browser.ts')
  };

  Object.assign(ngcWebpackConfig.plugin, {
    tsConfigPath: METADATA.tsConfigPath,
    mainPath: entry.main
  });

  return {
    mode: options.env,
    /**
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: entry,

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      mainFields: [...(supportES2015 ? ['es2015'] : []), 'browser', 'module', 'main'],

      /**
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.json'],

      /**
       * An array of directory names to be resolved to the current directory
       */
      modules: [helpers.root('src'), helpers.root('node_modules')],

      /**
       * Add support for lettable operators.
       *
       * For existing codebase a refactor is required.
       * All rxjs operator imports (e.g. `import 'rxjs/add/operator/map'` or `import { map } from `rxjs/operator/map'`
       * must change to `import { map } from 'rxjs/operators'` (note that all operators are now under that import.
       * Additionally some operators have changed to to JS keyword constraints (do => tap, catch => catchError)
       *
       * Remember to use the `pipes()` method to chain operators, this functinoally makes lettable operators similar to
       * the old operators usage paradigm.
       *
       * For more details see:
       * https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md#build-and-treeshaking
       *
       * If you are not planning on refactoring your codebase (or not planning on using imports from `rxjs/operators`
       * comment out this line.
       *
       * BE AWARE that not using lettable operators will probably result in significant payload added to your bundle.
       */
      alias: buildUtils.rxjsAlias(supportES2015)
    },

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

      rules: [
        ...ngcWebpackConfig.loaders,

        /**
         * To string and css loader support for *.css files (from Angular components)
         * Returns file content as string
         *
         */
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [helpers.root('src', 'styles')]
        },

        /**
         * To string and sass loader support for *.scss files (from Angular components)
         * Returns compiled css content as string
         *
         */
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [helpers.root('src', 'styles')]
        },

        /**
         * Raw loader support for *.html
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src', 'index.html')]
        },

        /**
         * File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },

        /* File loader for supporting fonts, for example, in CSS files.
        */
        {
          test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/,
          use: 'file-loader'
        }

      ],

    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'VERSION': JSON.stringify(pkg.version)
      }),

      /**
       * Plugin: SplitChunksPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      new SplitChunksPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),

      new SplitChunksPlugin({
        minChunks: Infinity,
        name: 'inline'
      }),
      new SplitChunksPlugin({
        name: 'main',
        async: 'common',
        children: true,
        minChunks: 2
      }),


      /**
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new CopyWebpackPlugin([
          {from: 'src/assets', to: 'assets'},
          {from: 'src/meta'}
        ],
        isProd ? {ignore: ['mock-data/**/*']} : undefined
      ),

      /*
      * Plugin: HtmlWebpackPlugin
      * Description: Simplifies creation of HTML files to serve your webpack bundles.
      * This is especially useful for webpack bundles that include a hash in the filename
      * which changes every compilation.
      *
      * See: https://github.com/ampedandwired/html-webpack-plugin
      */
      new HtmlWebpackPlugin({
        template: helpers.root('src', 'index.html'),
        title: METADATA.title,
        chunksSortMode: function (a, b) {
          const entryPoints = ["inline", "polyfills", "sw-register", "styles", "vendor", "main"];
          return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
        },
        metadata: METADATA,
        inject: 'body',
        xhtml: true,
        minify: isProd ? {
          caseSensitive: true,
          collapseWhitespace: true,
          keepClosingSlash: true
        } : false
      }),

      /**
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new ScriptExtHtmlWebpackPlugin({
        sync: /inline|polyfills|vendor/,
        defaultAttribute: 'async',
        preload: [/polyfills|vendor|main/],
        prefetch: [/chunk/]
      }),

      /**
       * Plugin: HtmlElementsPlugin
       * Description: Generate html tags based on javascript maps.
       *
       * If a publicPath is set in the webpack output configuration, it will be automatically added to
       * href attributes, you can disable that by adding a "=href": false property.
       * You can also enable it to other attribute by settings "=attName": true.
       *
       * The configuration supplied is map between a location (key) and an element definition object (value)
       * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
       *
       * Example:
       *  Adding this plugin configuration
       *  new HtmlElementsPlugin({
       *    headTags: { ... }
       *  })
       *
       *  Means we can use it in the template like this:
       *  <%= webpackConfig.htmlElements.headTags %>
       *
       * Dependencies: HtmlWebpackPlugin
       */
      new HtmlElementsPlugin({
        debug: true,
        headTags: require('./head-config.common')
      }),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({}),

      new ngcWebpack.NgcWebpackPlugin(ngcWebpackConfig.plugin),

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src')
      ),
      // new ngtoolsWebpack.AngularCompilerPlugin(ngcWebpackConfig.plugin),
      /**
       * Plugin: WebpackInlineManifestPlugin
       * Inline Webpack's manifest.js in index.html
       *
       * https://github.com/almothafar/webpack-inline-manifest-plugin
       */
      new WebpackInlineManifestPlugin(),

      ...helpers.isWebpackDevServer() ? [] : [
        new BomPlugin(false),
        new CompressionPlugin({
          threshold: 10240,
          test: /\.js$|\.css$|\.html$/,
          algorithm: "gzip",
          asset: "[path].gz[query]",
          minRatio: 0.8
        })
      ]
    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
};
