# GitHub Monorepo Development

# Monorepo Setup
- Initialize and set upstream or clone the monorepo
- In monorepo directory:
	- `$ npm install --save lerna`
    - Installs and saves lerna as a dependency for the project
		- Use npm registry -> `$ npm config set registry https://registry.npmjs.org/`
	- `$ lerna init --independent`
    - Initialize lerna with independent package versioning (vs. project versioning)

# Creating Packages
- In the packages directory:
  - `$ lerna create @scope/package-name`
    - Example: `@psu-ooe/wc-package`
    - This command also creates `lib/` and `__tests__/` in package directory -- may or may not be an option to turn this off, as well as set default "main" attribute.
- Make sure the resistry in the newly created packed directory is github packages
- Add files to new package
- Commit and push changes

# Publishing Packages (CL)
- `$ npm login --registry=https://npm.pkg.github.com --scope=@scope`
  - Uses personal access token, see more about token creation [here (GitHub Docs)](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and [here (brief of token package permissions)](https://dev.to/xcanchal/monorepo-using-lerna-conventional-commits-and-github-packages-4m8m#authentication-in-github-packages-and-npm)
- `$ lerna version [major | minor | patch | premajor | preminor | prepatch | prerelease]`
  - If the `--no-git-tag-version` options is used for lerna version, lerna will neither tag the release NOR commit the new package.json with updated version
  - Any prerelease identifier can be used and incremented (ex: 1.0.0-**dev.0** to 1.0.0-**dev.1**)
- `$ lerna publish from-git`
  - Will call `lerna version` (looking for a way to easily publish without incrementing version)
  - These last two commands are what we will use for GitHub Actions

# TODO
- `publishConfig:`**"access"?**
- Include `publishConfig:"registry"` in `lerna create`

# Links
## Reference
- [Lerna API Reference Docs](https://lerna.js.org/docs/api-reference/commands)
- [npm API Reference Docs](https://docs.npmjs.com/cli/v8/commands)

## Helpful Articles
### Monorepos & Lerna
- https://blog.npmjs.org/post/186494959890/monorepos-and-npm.html
- https://dev.to/xcanchal/monorepo-using-lerna-conventional-commits-and-github-packages-4m8m

### GitHub Packages & Actions
- [Publishing and installing a package with GitHub Actions](https://docs.github.com/en/packages/managing-github-packages-using-github-actions-workflows/publishing-and-installing-a-package-with-github-actions)
- [Publish Github Package](https://medium.com/tkssharma/publish-github-package-b4bc0c1182a7)