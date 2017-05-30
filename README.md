
There are multiple solutions for this challenge and that's why I would like to explain my decisions.

So, after reading the requirements I decided to focus on the reads performance. To achieve that I decided to flatten the tree structure, doing this I can easily search for all relations of any organization because I have all the relations in the database.

**Example:**

    {
        "org_name": "Paradise Island",
        "daughters": [{
            "org_name": "Banana tree",
            "daughters": [{
                "org_name": "Yellow Banana"
            },
            {
                "org_name": "Brown Banana"
            }]
        }]
    }
   
    +-----------------+-----------------+----------+
    | org             | org_relative    | relation |
    +-----------------+-----------------+----------+
    | Banana tree     | Brown Banana    | daughter |
    | Banana tree     | Paradise Island | parent   |
    | Banana tree     | Yellow Banana   | daughter |
    | Brown Banana    | Banana tree     | parent   |
    | Brown Banana    | Yellow Banana   | sister   |
    | Paradise Island | Banana tree     | daughter |
    | Yellow Banana   | Banana tree     | parent   |
    | Yellow Banana   | Brown Banana    | sister   |
    +-----------------+-----------------+----------+


If I want to search the relations of *Banana tree* I just need to do a simple `SELECT * FROM organization WHERE org = 'Banana tree'` and I get all the direct relations (parent, daughter, sister).

Of course, there are no perfect solutions, and by improving the read operations I *sacrificed* the writes, basically it's a trade off.

**Advantages**

 - Fast and simple read operations

**Disadvantages**

 - Lose tree hierarchy (we can't rebuilt the tree)
 - Flatten tree (bunch of rows)

**Setup Project**

 1. Create database (*scripts/create-database.sql*)
 2. Install node dependencies (*npm install*)
 3. Run application (*npm run start* or *npm run start-pm2*)
 4. (Optional) Generate fake data (*npm run generate*)
 5. GET: http://localhost:5000/api/organizations/TestOrg?page=1