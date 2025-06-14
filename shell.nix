let
  nixpkgsVer = "fd487183437963a59ba763c0cc4f27e3447dd6dd";
  pkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/${nixpkgsVer}.tar.gz") { config = {}; overlays = []; };
  libs = with pkgs; [
    nodejs_24
    bun
  ];
in pkgs.mkShell {
  name = "awakened-docs-2";

  buildInputs = with pkgs; [
  ] ++ libs;

  LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath libs;
}
