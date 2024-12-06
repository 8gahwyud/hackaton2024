from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from main import views
urlpatterns = [
    path('', views.MainPage),
    path('fvp/', views.fvpPage),
    path('lk/', views.lk),
    path('pickpath/', views.pickpath),
    path('admin/', admin.site.urls),
    path('operform/', views.operform),
    path('auth/', views.auth)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
