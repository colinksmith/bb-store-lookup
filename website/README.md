# bb-store-lookup

A website to help users find and set a store on BestBuy.com's locator based on a store number.

Todo:

- [x] Display store's address when looked up with a textbox

- [x] Add a button to copy the store's zip code

- [x] Add a link to the store locator

- [x] Make option to automatically copy the zip code upon pasting the zip code in the text box, without having to click a button

# bb-store-lookup, a tool used every day.
This website expedites the process of going from a store number to an actual location on the Best Buy website, or to the zip code that is needed for certain tasks within Best Buy's sales workflow. This is a personal tool of mine that when I worked with Best Buy I used every day, that I shared with my team that continues to use it to this day. The usual workflow when somebody calls in has certain information about a customer when they call in, including their phone number, phone queue they're calling into, and the store number (if any) they are calling when they reach us at a national line. This project allows the salesperson to go from the store number to finding exactly which store they're calling, as well as basic information about the store.

Most of our sales systems relied on a store zip code instead of a store number for things like checking availability and creating delivery orders, so this make the process much faster and easier, more consistent, and overall a much better experience for both the salesperson and the customer they're working with. 

Before this tool, the best way to go from store number to zip code would be to literally google "Best Buy store number {whatever number}" and usually the first link would be the correct store, as the store number is part of the url on the given store's location page. However, certain popular numbers would throw off the search engine such as store # 360, and so the process was not always effective. Plus, the workflow was much slower - something like 5 mouse clicks / keystrokes, and two fetch requests to get the given information, whereas this website brings it down to just one keystroke and no fetches. 

**Link to project:** [https://bbstorelookup.netlify.app/](https://bbstorelookup.netlify.app/)

![bb-store-lookup](https://github.com/colinksmith/bb-store-lookup/assets/88501518/40143801-9a22-49dc-b169-974da14dfb4b)


## How It's Made:

**Tech used:** React | CSS | Javascipt | Puppeteer | Node | Vite

This project is made of two parts: a single page react website bootstrapped by Vite, and a web scraper using Node and Puppeteer to gather the information from Best Buy's store directory. 

The website itself includes the data from the webscraper stored in a json file, which populates user searches. Three components make up everything the user sees: a header, lookup and store component. The lookup component takes the user input and references it in the json file, which then displays the store's information in the store component. Conditional rendering ensures that only relevant information is displayed, and if a store number is not applicable the store component displays as such.

The web scraper uses Puppeteer to autonomously go through the Best Buy store directory and populate a json file with relevant information about the store including the store number, address, and relevant links. This part was particularly tricky and I had to make my own error handling to make this part work, as the directory sometimes has several layers of links before getting to the page with the given information, as well as sometimes non-standard formats for premium stores or stores without a state such as the one in San Juan, Puerto Rico. I ended up making my own logging tool to help me find which stores were giving me errors so I could investigate why these edge cases were not working, and to make the app functional. 


## Things I would do differently

Web scraping the information, for one. Web scraping is a delicate process at best, and it slowed down the whole project. If I had access to the API, the whole part about getting the store's information wouldn't even be something to talk about, it'd just be pinging and API. But instead I had to learn a new technology, apply it to a new website, and do certain things to make sure that my connection wasn't interrupted or blocked since it would restart the whole process (until I changed it to be more robust). Web scraping is definitely a last resort option, but I'm glad it worked well in the end. 

It would be cool to be able to display more information about the locations, such as a phone number, email address or store hours, but given that information might change more often than the store's address I opted to leave it off. Most of the time that information isn't as critical to know as the zip code, so the link to the official website for that information remains an options, and the hardest part (linking store number to a location on the website) is fulfilled. 

I haven't done anything to make the scraping of the data autonomous, but that would obviously help resolve the last point, and make the website more robust. Currently I still have the scripts and can run it manually whenever I find any information is out of date, but the website still fulfills the problem I set out to solve with building it, and I haven't found the time to work on it further. It's good enough for now.

## Lessons Learned:

This project was a crash course in web scraping, and a simple react app. I made sure to limit the scope of this project and so was able to complete it relatively quickly, which I'm proud of as it shows my project management skills are improving. It's also something to show that I know how to make React and Puppeteer work for me, instead of just having a vague feeling of "Oh yeah I know how to use those tools" here is a concrete project that shows that I can build something that solves a problem, and those tools are the things that I will reach for becuase I know how to use them well enough that they serve me, and not something I have to keep falling back on documentation to try to muddle through. 
