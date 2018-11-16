# How to Contribute

###### BETA Contribution List. Will change randomly.

### Issues

1. Go to the **Issues** tab, then **New Issue**
2. Select the one that best fits you.
3. Change the check boxes as necessary, and add text to things you need to put.
4. Submit.

### Pull Requests

##### If you prefer coding in a Coding Environment...

1. Fork the Repository.
2. Make a directory/folder somewhere.
3. Copy either the ``HTTPS`` or ``SSH`` of your fork.
4. Run ``git init`` => ``git remote add origin [CopiedThingHere]`` => ``git pull origin master``
5. Open the Folder in your Coding Environment. (ensure you are not in the ``src/`` of the directory)
6. Run ``npm install``
7. Begin coding.
8. When finished, push the changes.

##### If you prefer coding in Github...

1. Fork the Repository.
2. Done.

##### When Ready... (oh yeah, this might require you to have to have your files out of your fork...)

1. Go [here](https://github.com/BLU-Shack/SimpleSpaceDocs)
2. Fork it.
3. Make a folder (I'll call it ``GitDec``)
4. Run ``git init`` => ``git remote add origin [CopiedThingHere]`` => ``git pull origin master``
5. Go back to your directory where you have your updated contents.
6. If you don't have the module, run ``npm i -g jsdoc-to-markdown``
7. Run ``jsdoc2md src/index.js``
8. Copy the new contents.
9. Go to ``GitDec`` => ``Latest`` => ``DOCS.md``
10. Replace the contents with your copy and pasted data.
11. Save.
12. Commit n' Push
13. Create a Pull Request to their corrosponding forks.