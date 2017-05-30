# Bilverkstad

Skoluppgift i grupp med fokus på backend.

Projekt medlemmar :+1: :metal: 

Jarl
Patricio
Martin 
Mayra
Faj

Innan man startar appen behöver man importera mongoDB data till sin egen mongoDB databas.
Data befinner sig i mappen "bilverkstadDB (mongodb)"

Scenario

En bilverkstad vill kunna lagra (skapa, läsa, ändra och ta bort) information om följande i
en databas:

1) Vilka fordon som för tillfället är under reparation (reg. nr, modell etc)
mongoDB: "rest/repairsCar/active"

2) Kunder (personnummer, adress etc)
mongoDB: "rest/customer"

3) Vilka kunder som lämnat in vilka fordon.
mongoDB: "rest/repairsCar"

4) Vilken skador/fel som ska åtgärdas på varje fordon.
mongoDB: "rest/repairsCar"

5) Vilka anställda man har
mongoDB: "rest/employee"

6) Vilka anställda som arbetar/har arbetat med varje fordon
mongoDB: "rest/repairsCar"

7) Vilka reservdelar man har i lager och vilka fordonsmodeller de passar
mongoDB: "rest/sparePart"

8) Om en reparation/åtgärd av ett fordon är kommande, pågående eller avslutad.
mongoDB: "rest/repairsCar"

9) Arbetstid nedlagd på ett visst fordon.
mongoDB: "rest/repairsCar"

10) Vilka tider olika anställda har semester.
mongoDB: "rest/employee/vacation" (detta visar egentligen de anställda som är på semester)


Generellt (mongoDB): Det går att se ett specifikt element på alla routes om man inkluderar mongos id efter modulnamnet.
För att kunna använda sig av POST, PUT och DELETE behöver man logga in med en "employee". Om du inte loggar in kan du bara använda GET.

-----------------------------

Innan man startar appen behöver man importera Mysql databas
Skripten till database befinner sig i mappen "bilverkstadDB (Mysql)"

Scenario i Mysql


1) Vilka fordon som för tillfället är under reparation (reg. nr, modell etc)(Create and read)

sql/repairsCar

2) Kunder (personnummer, adress etc) (CRUD)
 sql/customer


3) Vilka anställda man har(CRUD)
 "sql/employee


4) Vilka reservdelar man har i lager och vilka fordonsmodeller de passar (Create and read)
 "sql/sparePart
