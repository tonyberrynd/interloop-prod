# Interloop Client

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
Serves the app using browser sync - will automatically compile style and html updates

```
gulp build
```
Builds the app (minify, annotate, etc) & puts files into build folder

```
gulp serve:build
```
Serves the app from the build folder


## Changelog

[Version 3.0.1-Beta](https://headwayapp.co/interloop-release-notes/interloop-v3.0.0-beta-28076) - 11/16/17
- <b>Infinite Scrolling</b> - View management is now done server side and allows filters to be applied to large lists in less than a second (500K+ Records)
- <b>"Easy Relate"</b> - Our new easy relate feature allows users to relate entities, activites, and more to other records from whereever they are in the application. This streamlines the creation process and makes updating Opps, Companies, etc much easier.
- <b>Visual History Stream</b> - We listened to customer feedback and have made the history stream much more visible - making it easier to see what is happening within any given entity. 
- <b>Configuration & Setup</b> - Interloop is now fully self-serve and configurable for our clients. You can easily manage users, update sales stages, statuses, manage forecast categories & cadences, and much much more.
- <b>Security Rules & Administration</b> - Interloop now supports advanced security rules so you can sequester data by user, team, role, & more. Records can also be shared individually to handle any sort of advanced security needs. 


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
