(make sure run `npm i`)

App installaion
- `forge register`
- `forge deploy`
- `forge install`

Playing with Webtrigger of checking `app access rule` to simulate Forge request to the Product (Confluence)
- `forge webtrigger`
- ping the url returned (there is no auth) (POST)
- pass space list as body ({ "space_list": ["AARALLOWED-1", "AARBLOCKED-1"] })

Playing with Webtrigger of consuming `Forge app property api` to simulate Forge request to the Product (Confluence)
- `forge webtrigger`
- ping the url returned (there is no auth) (POST)
- for Upserting app property, pass property_key and property_value (JSON formatted) as request Body ({
    "property_key": "testKey",
    "property_value": {
        "hello": "world"
    }

})

- for Deleting app property, just pass key ({
    "property_key": "testKey"
})
