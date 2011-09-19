# NodeLint TextMate Bundle

[nodelint][nodelint] uses [node.js][node] and [JSLint][jslint] to report errors within your JavaScript files. This bundle hooks into TextMate's save or validate key binding to run [nodelint][nodelint]. It will work on any file or selected text associated with TextMate's `source.js` scope selector.


This bundle draws most of it's inspiration from [SubtleGradient's excellent JavaScript Tools bundle][jstools].


## Version Support

[node.js][node]: version 0.1.103 >


## Installation

You'll first need to make sure you have the latest version of [node.js][node] installed and it's in a `$PATH` where TextMate can access it. There are a few different options for installing this bundle:

**Install via Git:**

    cd ~/Library/Application\ Support/TextMate/Bundles/
    git clone https://github.com/mkitt/nodelint.tmbundle.git "JavaScript NodeLint.tmbundle"
    git submodule update --init
    osascript -e 'tell app "TextMate" to reload bundles'

**Via download from GitHub:**

1. Click the "Download Source" button
2. Unzip the downloaded file
3. Rename the folder to "JavaScript-NodeLint.tmbundle"
4. Double-click the .tmbundle file
5. TextMate will automatically add it to your bundles
6. In TextMate's Finder bar select `Bundles => Bundle Editor => Reload Bundles`

*You'll need to manually update your bundle to stay current down the road if you go this route.*


## TextMate Global Settings

Once you have the bundle installed, under the `Support/bin/` folder lives the submodule to [nodelint][nodelint]. I'd suggest leaving this alone and let [nodelint][nodelint] live it's life, there are plenty other places you can affect configurations. If you feel the need to adjust how [nodelint][nodelint] works, please fork that repository and ask [Tav][tav] for a pull request there.

Within `Support/conf/` there are 3 files which you can alter. These files are generally what the bundle will read when running [nodelint][nodelint] validations:

- `config.js`: Contains the [JSLint options][jslintopts] that [nodelint][nodelint] complains about while it's being run
- `summary_reporter.js`: The reporter which displays a TextMate tooltip when a file is saved (`⌘S`).
- `full_reporter.js`: The reporter which is ran when opening TextMate's web preview (`⌃⇧V`).

You'll want to tune these to your liking as they are what the bundle defaults to as your system wide settings within TextMate.

You can also override the path to the config file by creating the `TM_NODELINT_CONFIG` shell variable under `Preferences -> Advanced -> Shell Variables`. So mine looks like:

        TM_NODELINT_CONFIG /Users/username/Library/Application Support/TextMate/Support/nodelint-config/config.js

This will take precedence over the 2 default config files (nodelint's and the one in `Support/conf`)


## Project Specific Settings

It's also possible to have "project" or "directory" specific settings for reporters and the configuration of [JSLint options][jslintopts]. 

Say you're collaborating or contracting on a project and the best practice is to use 4 soft tab spacing instead of you're preferred 2 soft tab space indentation and they increment variables with `++` instead of `+= 1`. You know that's crazy talk, and don't want to switch your system wide [nodelint][nodelint] settings, but also don't want to wade through all of the errors being thrown out of your TextMate setup. You could add [JSLint specific comments][jslintopts] to each file, but there's a better solution for this.. 

At the **base working directory** of the project you can create files to override your global TextMate settings without changing anything else. Files are one to one with the 3 files contained within `Support/conf/`. Create any of these files you're looking to override.

- `./nodelint-config.js`: overrides `Support/conf/config.js` or `TM_NODELINT_CONFIG`
- `./nodelint-sreporter.js`: overrides `Support/conf/summary_reporter.js` which is triggered on save (`⌘S`).
- `./nodelint-freporter.js`: overrides `Support/conf/full_reporter.js` which is triggered on validate (`⌃⇧V`).

Most likely, you'll only need to override the [JSLint options][jslintopts] on a per project basis, but the ability to override `Reporters` are in there just in case. I would also suggest adding any of these project specific settings to your `.gitignore` file as well. 

I'd say, I'm not "totally stoked" on where these overridden files end up, so I'm open to any suggestions.


## Usage

- **Validate Nodelint Summary** (`⌘S`): Runs [nodelint][nodelint] on the current file or selected text, the number of failures (and descriptions if less than 2), if there are no errors the tooltip is not displayed. Uses `Support/conf/summary_reporter.js` unless a project specific `./nodelint-sreporter.js` is present.
- **Validate Nodelint Full Report** (`⌃⇧V`): Runs [nodelint][nodelint] and prints results to a new window. Results are hyperlinked back to the document's errors. Uses `Support/conf/full_reporter.js` unless a project specific `./nodelint-freporter.js` is present.
- **Stub Configuration File**: Inserts the necessary text for generating a project specific `./nodelint-config.js` file for overriding [JSLint options][jslintopts]
- **Stub Reporter File**: Inserts the necessary text for generating a project specific `./nodelint-freporter.js` or `./nodelint-sreporter.js` file for overriding either of your default `Reporters`.

There are also two templates included when generating a file from `New From Template` equivalent to `Stub Configuration File` and `Stub Reporter File`.


## Contribute

To contribute any patches, fork this repository using GitHub and send a [pull request my way][mkitt].


## Credits ##

- [Ryan Dahl][ry]: And the numerous contributors to [node.js][node]
- [Tav][tav]: And the contributors to [nodelint][nodelint]
- [Douglas Crockford][crockford]: wrote the original [JSLint][jslint] and rhino.js runner
- [SubtleGradient][subtlegradient]: who created the awesome TextMate [JavaScript Tools bundle][jstools] which will also validate your JavaScript as well as minifying and compressing your files down. It's pretty hot.


[node]: http://nodejs.org/
[nodelint]: http://github.com/tav/nodelint
[jslint]: http://www.jslint.com/
[jslintopts]: http://www.jslint.com/lint.html#options
[mkitt]: http://github.com/mkitt
[ry]: http://github.com/ry
[tav]: http://tav.espians.com
[crockford]: http://www.crockford.com
[subtlegradient]: http://github.com/subtleGradient/
[jstools]: http://github.com/subtleGradient/javascript-tools.tmbundle

