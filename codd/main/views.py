from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Users, Adminusers, AcceptedRequests, Notifications, Saveduserpath, Supportchatlogging, Userrequests
import json

@csrf_exempt
def MainPage(request):
    return render(request, 'mainpage.html')
@csrf_exempt
def fvpPage(request):
    return render(request, 'favPath.html')
def lk(request):
    return render(request, 'lk.html')
@csrf_exempt      

def auth(request):
    print(request.body)
    _type = json.loads(request.body)['type']
    if (_type == 'Вход'):
        email = json.loads(request.body)['email']
    password = json.loads(request.body)['password']
    try:
        user = Users.objects.all()
        user = user.filter(login=email, passwd=password)
        print(user.query)
        user = user[0]
    except ObjectDoesNotExist:
        print("Объект не сушествует")
    return JsonResponse({'username': user.username, 'login': user.login, 'password': user.passwd, 'points': user.points})

    