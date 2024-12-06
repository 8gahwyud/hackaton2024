from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from .models import Users, Adminusers, AcceptedRequests, Notifications, Saveduserpath, Supportchatlogging, Userrequests
import json

@csrf_exempt
def MainPage(request):
    return render(request, 'mainpage.html')
def fvpPage(request):
    return render(request, 'favPath.html')
@csrf_exempt
def operform(request):
    if(request.method == 'GET'):
        return render(request,'operform.html')
    if(request.method == 'POST'):
        body = json.loads(request.body)
        print(body)
        descr = body['descr']
        adress = body['descrq']
        issue = body['issue']
        newreq = Userrequests.objects.create(userid=Users.objects.get(userid=1),description=descr,whatheppens=issue,address=adress,imageaddress='img.img',geolocation='geo')
        newreq.save()
        return JsonResponse({'status':200})
def pickpath(request):
    return render(request, 'pickpath.html')
def lk(request):
    return render(request, 'lk.html')
@csrf_exempt      

def auth(request):
    print(request.body)
    _type = json.loads(request.body)['type']
    print(_type)
    if (_type == 'Вход'):
        email = json.loads(request.body)['email']
        password = json.loads(request.body)['password']
        try:
            user = Users.objects.all()
            user = user.filter(login=email, passwd=password)
            print(user.count())
            if user.count() != 0:
                user = user[0]
            else:
                return JsonResponse({'error': "Пользователь не зарегестрирован"})
        except ObjectDoesNotExist:
            print("Объект не сушествует")
        return JsonResponse({'username': user.username, 'login': user.login, 'password': user.passwd, 'points': user.points})
    if (_type == 'регистрация'):
        email = json.loads(request.body)['email']
        password = json.loads(request.body)['password']
        us = json.loads(request.body)['username']
        user = Users.objects.all()
        try:
            user = user.filter(login=email)
            print(user.count())
            if user.count() != 0:
                return JsonResponse({'error': "Данная почта уже используется"})
        except:
            pass   
        newuser = Users.objects.create(login=email,passwd=password,username=us, points=0)
        newuser.save()
        return JsonResponse({"status":"Created"})
    if (_type == 'Авторизация'):
        us = json.loads(request.body)['username']
        email = json.loads(request.body)['email']
        password = json.loads(request.body)['password']
        try:
            auser = Adminusers.objects.all()
            auser = auser.filter(username=us ,login=email, password=password)
            print(auser.count())
            if auser.count() != 0:
                auser = auser[0]
            else:
                return JsonResponse({'error': "Пользователь не зарегестрирован"})
        except:
            print("Объект не сушествует")
        return JsonResponse({'username': auser.username, 'login': auser.login, 'password': auser.password, 'adminAuth':True})
    
    