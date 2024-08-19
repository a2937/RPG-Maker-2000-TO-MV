# RPG 2000 to MV

This tool is designed to update or migrate RPG Maker 2000/2003 databases to RPG Maker MV. It reads old RPG Maker 2003 files (that have been parsed by EasyRPG's liblcf into XML), extracts the relevant data, and generates new JSON files that are compatible with more modern engines or tools.

## Features

This tool is designed to update or migrate RPG Maker databases from one format to another. It reads the old RPG Maker database files, extracts the relevant data, and generates new JSON files that are compatible with more modern engines or tools.
Features

- Modular Design: The tool is designed to be modular, with functions that can update different parts of the database such as actors, skills, items, enemies, troops, classes, states, tilesets, and maps.

- Flexible Input and Output: The paths to the old database files and the new JSON files can be passed as command-line arguments, allowing for flexible usage.

- Soft Dependency on EasyRPG's liblcf: This tool relies on liblcf for reading binary data from RPG Maker database files. This is necessary due to the complexity of the binary format.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.
- EasyRPG liblcf: You need to have EasyRPG's liblcf installed, as it is required for reading the binary data of RPG Maker database files. You also need a legal copy of RPG Maker 2000 or 2003 and RPG Maker MV or MZ. 
- PNPM: To manage NodeJS dependencies

## Installation

  Clone this repository:

  ```bash
    git clone https://github.com/yourusername/rpg-maker-database-updater.git
    cd rpg-maker-database-updater
  ```

Install the required Node.js packages:

```bash
pnpm install
``` 

## Usage

You can run the tool from the command line, specifying the paths to the old database files and the directory where the new JSON files will be generated.

### Command-Line Arguments

-    --oldPath: Path to the directory containing the old RPG Maker database files (e.g., RPG_RT.edb).
-    --newPath: Path to the directory where the new JSON files will be saved.

Example usage:

```bash
pnpm run start:dev --oldPath ./Old --newPath ./New
```

## Output

The tool will generate new JSON files in the specified output directory. These files will include updated or migrated data for the following:

- Actors
- Skills
- Items
- Enemies
- Troops
- Classes
- States
- Tilesets
- Maps

## Running Tests

To ensure that your changes do not break existing functionality, you can run the test suite included with the project. The tests cover various parts of the database update process.

### Running Tests with Mocha 

Run the test suite.

```bash
pnpm run test
```

This will run all tests in the tests directory using Mocha, and you will see the output in the terminal indicating whether the tests have passed or failed.

### Test Coverage

The tests aim to cover all critical functionality, including:

- Reading and parsing old RPG Maker database files.
- Generating correct JSON output files.
- Ensuring that the migration process preserves all necessary data.

If you add new features or fix bugs, please add corresponding tests to ensure continued reliability.

### Contributing

If you have suggestions for improvements or find any bugs, feel free to open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
