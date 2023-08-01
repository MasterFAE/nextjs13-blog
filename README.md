# Caching issues:

Everytime SSR renders a page, system caches the data(current store data store) and page doesn't react well.

Go to Page ID: 1 -> delete ID: 2 Go to Page ID 3 -> You will see id 2 is deleted Go to Page ID: 1 -> ID 2 still exist because Page 1 cached the data with page 2 data.
