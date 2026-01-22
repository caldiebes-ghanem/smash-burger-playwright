# smash-burger-playwright
automation of smashburger website using playwright and typescript
# test set-up 

# TC1 — Place pickup order with “Create Your Own” burger + validate details across pages
Preconditions
        Location selected (ZIP 80246 → first store).
        Pickup selected.
        Cart is empty.

Test data (you can choose any options)

Steps
        Navigate to Create Your Own burger page.
        Select options (bun/cheese/toppings/sauces/etc.).
        Add item to cart.
        Open Cart page.
        Validate the item line shows:
        Product name
        Selected options (all chosen modifiers)
        Quantity
        Price (item + modifiers if applicable)
        Proceed to Checkout.
        Validate checkout order summary shows the same:
        Product name
        Selected options/modifiers
        Quantity
        Totals (subtotal/tax/fees if present)
        Place the order (using NeaPay per assignment).
        On Order Details (confirmation page), validate again:
        Order contains the same item and modifiers
        Pickup store/location matches selected store
        Pickup type is correct (pickup)
        Total matches checkout total (or matches expected calculation rule)

Expected results
        The exact same configuration (name + modifiers + quantity + price/total) is consistently displayed on Cart, Checkout, and Order Details pages.