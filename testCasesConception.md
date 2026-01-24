# TC1 — Sign in  log out

# TC2 — log in in  

# TC3 — Place pickup order with “Create Your Own” burger + validate details across pages
Preconditions
    connect as a guest 
    use zip code 80246
    chose first store 
    Use neapay 
Steps
    Navigate to a standard burger product page.
    Customize the item (remove/add modifiers).
    Add item to cart.
    Open Cart page.
    Validate item line shows:
    Product name
    Selected modifiers (incl. removals/additions)

    Price reflects modifier impact (if applicable)
    Proceed to Checkout.
    Validate checkout summary matches cart:
    Product name
    Modifiers
    Place the order using NeaPay.
    On Order Details/Confirmation, validate:
    Same item + modifiers
    Pickup store matches selection

Expected result
    The standard item and its modifications are identical across Cart → Checkout → Order Details, including product information.

# TC4 Update quantity in cart (increase/decrease) + verify totals recalc correctly through checkout and confirmation

Prerequisites
    Location selected (ZIP 80246 → first store)
    Pickup selected
    Cart is empty

Steps
    Add 1 item to the cart.
    Open Cart.
    Increase quantity to 2 (or 3).
    Validate:
    Quantity updated
    Line total updated accordingly
    Cart subtotal updated accordingly
    Decrease quantity back to 1.
    Validate totals update again correctly.
    Proceed to Checkout.
    Validate order summary quantity + totals match cart.
    Place order using NeaPay.
    On Order Details, validate:
    Quantity matches
    Total matches checkout

Expected result
    Quantity changes are persisted and totals are recalculated correctly across Cart → Checkout → Order Details.

# TC5 — Remove an item from cart + validate empty cart and checkout is blocked/handled correctly

Prerequisites
    Location selected (ZIP 80246 → first store)
    Pickup selected
    Cart is empty

Steps
    Add an item to the cart.
    Open Cart.
    Remove the item (trash icon/remove button).
    Validate cart becomes empty:
    No items displayed
    Subtotal/total resets (0 or not shown)
    “Empty cart” message shown (if applicable)
    Attempt to proceed to Checkout (if button exists).
    Validate behavior:
    Checkout button disabled OR
    User is prevented and shown a message

Expected result
    Removing the last item results in a true empty cart state, and the system prevents checkout (or clearly handles it).

# TC6 — Cart Page item image validation: mock response to inject images for items that have no image

Prerequisites
    ZIP 80246, first location selected
    Pickup selected
    Cart empty
    Ability to identify 2–5 items with missing images on Cart page (per assignment)

Steps
    Add 2 to 5 items that appear on Cart page without images.
    On navigation to Cart, intercept the relevant storefront API call returning cart/menu item data (Playwright page.route).
    Modify the response JSON to insert a valid image URL for each item missing an image.
    Continue the request with the mocked response.
    Validate on Cart page:
    Each previously imageless item now displays an image element
    Image src matches the injected URL (or the UI displays it as loaded)

Expected result
    Using mocked network data, Cart shows images for items that originally had none, meeting the assignment requirement for data mocking + image insertion.

