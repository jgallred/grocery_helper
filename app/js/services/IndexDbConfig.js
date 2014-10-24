App.config(function ($indexedDBProvider) {
    $indexedDBProvider
        .connection('recipies')
        .upgradeDatabase(1, function (event, db, tx) {
            var meal_store = db.createObjectStore('meals', {keyPath: 'id', autoIncrement:true});
            var ingredient_store = db.createObjectStore('ingredients', {keyPath: 'id', autoIncrement:true});
            ingredient_store.createIndex('meal_id_idx', 'meal_id', {unique: false});
        });
});