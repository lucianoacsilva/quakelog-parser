# quakelog-parser
Simple quakelog parser.

## Usage

There are two scripts in this repot which extract information about kills from a log of a Quake server log. By executing each of them, it is possible to view insights of information of kills grouped by user (the first script) and grouped by means (the second one). For the former, there are some important considerations to analyse the statistics:

<ol>
  <li>Self kills (expressed in lines like <user_foo> killed <user_foo> are not considered in the user kills score;</li>
  <li>When the user is "killed" by the game environment (denoted as "<world>"), his score decreases by one unit;</li>
</ol> 

To parse the log and obtain the two views, it is required to have *Node.js* installed. No JavaScript external libs installable by package managers, such as NPM and Yarn, are necessary.

To extract grouped kilss information by user, just run:

<code>node grouped_info.js</code>

, and it will appear in a file called *report1-grouped_information.json* in the root of the repository.

To extract grouped kilss information by user, just run:

<code>node grouped_kills_by_means.js</code>

, and it will appear in a file called *report2-grouped_kills_by_means.json* in the root of the repository.
