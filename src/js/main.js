var button = $('#button')

button.click(function () {

    var text = $('#input').val()

    console.log(text)

    var promises = text.trim().split(',').map(function (item) {
        console.log(item)
        return fetch(item).catch(function () {
            alert(item + ' cannot be detected')
        })
    });

    function detectShopify (website) {
        return website.text().then(function (websiteText) {
            return {
                shopify: websiteText.includes('var Shopify = Shopify'),
                site: website.url
            }
        })
    }

    promises.forEach(function (promise) {
        promise.then(detectShopify)
               .then(setDomNode)
    });

    function setDomNode (obj) {
        if (obj.shopify) {
            $('#list').append('<li>'+ obj.site +' has shopify</li>')
        } else {
            $('#list').append('<li>'+ obj.site +' has  no shopify</li>')
        }
    }

})
