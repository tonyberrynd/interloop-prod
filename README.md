# Interloop Client

Version 3.0.1-Beta - 11/16/17
###Interloop Version 3 is now live and in Beta! 
<br>
Our biggest updates yet - Version 3 has been built from the ground up to improvement performance, usability, and the ability to handle much larger data sets with ease. Version 3 now relies on server side filtering, infinite scrolling, and advanced view management to make it easier to sort, filter, and take action on your sales data. 
<br>
In adition, Interloop v3.0.0-Beta ships with a whole new administration section so Interloop Admins can set up, modify, import data, export data in a self serve manner. 
Check out the detailed changelog below and be sure to stay tuned as we've got big plans for our next updates. 


####New Features

- <b>Infinite Scrolling</b> - View management is now done server side and allows filters to be applied to large lists in less than a second (500K+ Records)
- <b>"Easy Relate"</b> - Our new easy relate feature allows users to relate entities, activites, and more to other records from whereever they are in the application. This streamlines the creation process and makes updating Opps, Companies, etc much easier.
- <b>Visual History Stream</b> - We listened to customer feedback and have made the history stream much more visible - making it easier to see what is happening within any given entity. 
- <b>Configuration & Setup</b> - Interloop is now fully self-serve and configurable for our clients. You can easily manage users, update sales stages, statuses, manage forecast categories & cadences, and much much more.
- <b>Security Rules & Administration</b> - Interloop now supports advanced security rules so you can sequester data by user, team, role, & more. Records can also be shared individually to handle any sort of advanced security needs. 


#####Improvements

- <b>Enhanced Detail Panels</b> - Detail panels can now be directly navigated from the URL bar and now provides advanced editing capabilities.
- <b>Advanced View Management</b> - Views can now be shared with teams, individuals, or the whole organization. 
- <b>Advanced Filters</b> - V3 now ships with a host of new filter options including the ability to support "and" / "or" type queries across filters.

	
#####Bug Fixes
- <b>Filter Issues</b> - ensuring filters are much more solid and can handle multiple "date" type filters
- <b>Data validation</b> - adding data validation rules to prevent document sizes from getting too big
- <b>Password reset</b> - wasn't always sending password reset email to correct email address


Version 2.0.16 - 8/13/2017
- Moved Fontastic to CDN

Version 2.0.15 - 7/23/2017
- Election Counter fix
- Update Needed Indicator fix



Version 2.0.14 - 7/16/2017
- Data update indcators
- Data validation on sidebar
- Data Update flag on filters


Version 2.0.13 - 6/15/2017
- New Sales Process 
- Sales Conditions
- Sales Triggers 

[Interloop](https://interloop.ai) is a Sales Execution & Forecasting Platform for B2B Sales

### Overview

For details on the models used, tips and tricks, and other integrations - see our [wiki](https://github.com/InterloopHQ/interloop2-api/wiki)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing

**Download Dependencies**
=======
Download Dependencies


```
npm install
```

```
bower install
```

**Start the Server**
=======
Start the Server - Uses Browser Sync to auto reload

```
gulp serve
```


**Gulp Tasks**
=======


```
gulp serve
```
Serves the develop

```
gulp build
```
Builds the app (minify, annotate, etc) & puts files into build folder

```
gulp serve:build
```
Serves the app from the build folder


## Changelog


Interloop Client  - V2.0.13 - (05/18/2017)
- Added Start and End Dates 
- Filter updates
- Bux Fixes 

Interloop Client  - V2.0.12 - (04/10/2017)
- Add My Commits

Interloop Client  - V2.0.11 - (03/07/2017)
- Added Full Contact getContacts admin function 

Interloop Client  - V2.0.10 - (03/07/2017)
- Updated cache management
- Added product estimates 
- Added product totals calculations 
- Added forecast fields 
- Added meetings to activity view 

Interloop Client Seperated - V2.0.9b - (03/02/2017)
- Fixed new opp navigation to record after creating 
- add owners to new entity picklists

Interloop Client Seperated - V2.0.9a - (03/02/2017)
- Added fix for dependent picklists

Interloop Client Seperated - V2.0.9 - (03/01/2017)
- Create Entities from relationship wizard
- Long List mgmt 
- Loader for long lists 
- History updates 
- Updated styling 
- Display entities in activity lists 

Interloop Client Seperated - V2.0.8 - (02/23/2017)
- Improved History Panel
- Added Date Range Filter Chips
- Bug fixes


Interloop Client Seperated - V2.0.7- (02/21/2017)
- Dependent PickLists
- Activity Pick Lists 
- UX Improvements
