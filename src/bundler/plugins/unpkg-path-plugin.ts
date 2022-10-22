import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      //handle index
      build.onResolve({ filter: /(^index\.js$)/ }, async (args: any) => {
        return { path: args.path, namespace: "a" };
      });

      //handle relative files in module
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        const newUrl = new URL(
          args.path,
          "https://unpkg.com" + args.resolveDir + "/"
        );
        return { path: newUrl.href, namespace: "a" };

        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });

      //handle main file of module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });
    },
  };
};
