# overview_balance
simple custom load balancer for overview component

id is to send every other request out to a different api (starting with 2).

this ensures the cache being received on each service stays small.  (hopefully)

this change was prompted when running loader io tests.  The service can handle multiple tests but at a certain point timeout requests begin to happen because redis is reaching its cache memory limit for t2 micro.

