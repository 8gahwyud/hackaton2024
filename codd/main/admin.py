from django.contrib import admin
from .models import Users, Adminusers, AcceptedRequests, Notifications, Saveduserpath, Supportchatlogging, Userrequests
admin.site.register(Users)
admin.site.register(Adminusers)
admin.site.register(AcceptedRequests)
admin.site.register(Notifications)
admin.site.register(Saveduserpath)
admin.site.register(Supportchatlogging)
admin.site.register(Userrequests)
