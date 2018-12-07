# Slideshow Portlet

[![Build Status](https://travis-ci.com/qbicsoftware/slideshow-portlet.svg?branch=development)](https://travis-ci.com/qbicsoftware/slideshow-portlet)[![Code Coverage]( https://codecov.io/gh/qbicsoftware/slideshow-portlet/branch/development/graph/badge.svg)](https://codecov.io/gh/qbicsoftware/slideshow-portlet)

Slideshow Portlet, version 1.0.0-SNAPSHOT - A slideshow Vaadin widget to display functionalities, charts, results etc. in a slideshow on the landing page of the portal

## Author
Created by Jennifer Bödker (jennifer.boedker@student.uni-tuebingen.de).

## Description

This portlet uses *Vaadin* and *Javascript* to create a picture slideshow. The config.txt defines what picture file types
are loaded into the slideshow (see `scr/main/webapp/VAADIN/images`). 
Furthermore, pictures can be loaded dynamically. If the end of the slideshow is reached the pictures from `scr/main/webapp/VAADIN/images` are automatically
new loaded.

The design of the slideshow is based on the tutorial of [w3schools](https://www.w3schools.com/howto/howto_js_slideshow.asp "w3schools.com").

## How to Install

To install the portlet deploy it and move the desired pictures to the folder `liferay-portal-6.2-ce-ga6/tomcat-7.0.62/webapps/VAADIN/images`.
The pictures can be changed while the portlet is running, the list will dynamically be updated.
