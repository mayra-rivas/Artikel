//node module that populates mongoose schemas
module.exports = {
  populatePosts: function(docs, key, next){
    //if the docs  does not exist (is an array)
    if(docs.constructor.name != "Array"){
      //set docs to an array of docs
      docs = [docs];
    }

    //if docs dont have a length we need to call next.
    //otherwise next will never be called and our app will freeze
    if(!docs.length)
    {
      next();
    }
    //set a count and a done count. Used to detirmine when the populate is done
    var count = 0, doneCount = 0;
    //loop through docs
    for(var i = 0; i < docs.length; i++){
      //increase count with each itteration
      count++;
      //populate the docs[i] "key" property
      docs[i].populate(key, function(err, items){
        //increase doneCount with each callback done
        doneCount++;

        //if the count and the doneCount value is equal, the populate is done
        //and next is called
        if(count === doneCount){
          next();
        }
    	});
    }
  }
};