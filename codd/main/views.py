from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from .models import Users, Adminusers, AcceptedRequests, Notifications, Saveduserpath, Supportchatlogging, Userrequests
from datetime import datetime
import json

@csrf_exempt
def MainPage(request):
    return render(request, 'mainpage.html')
@csrf_exempt
def fvpPage(request):
    if(request.method == 'GET'):
        return render(request, 'favPath.html')
    if(request.method == 'POST'):
        data = json.loads(request.body)['userid']
        dataforresp = {}
        savedpath = Saveduserpath.objects.all().filter(userid=Users.objects.get(userid=data))
        print(savedpath.query)
        i = 0
        for item in savedpath:
            dataforresp[f'{i}'] = {
                'pathid':item.pathid,
                'userid':data,
                'startPoint':item.startpoint,
                'endPoint':item.endpoint,
                'pathName':item.pathname,
                'notify':item.notify
            }
            i+=1
        print(dataforresp)
        return JsonResponse(dataforresp)
            
    return JsonResponse({'lol':True})
@csrf_exempt
def operform(request):
    if(request.method == 'GET'):
        return render(request,'operform.html')
    
    if(request.method == 'POST'):
        body = json.loads(request.body)
        descr = body['descr']
        adress = body['descrq']
        issue = body['issue']
        newreq = Userrequests.objects.create(userid=Users.objects.get(userid=1),description=descr,whatheppens=issue,address=adress,imageaddress='img.img',geolocation='geo')
        newreq.save()
        return JsonResponse({'status':200})
@csrf_exempt
def pickpath(request):
    if(request.method == 'GET'):
        return render(request, 'pickpath.html')
    if(request.method == 'POST'):
        body = json.loads(request.body)
        try:
            startpoint = body['startPoint']
            endpoint = body['endPoint']
            pathname = body['pathName']
        except:
            return JsonResponse({'error': 'cant add to db'})
        newpath = Saveduserpath.objects.create(userid=Users.objects.get(userid=1), startpoint=startpoint, endpoint=endpoint, pathname=pathname, notify=0)
        newpath.save()
        return JsonResponse({'status':200})
@csrf_exempt
def chatpage(request):
    if (request.method == 'GET'):
        return render(request, 'chat.html')
    elif(request.method == 'POST' and json.loads(request.body)['type'] == 'getMessages'):
        body = json.loads(request.body)
        userid = body['userid']
        messagesForUser= Supportchatlogging.objects.all().filter(usersenderid=Users.objects.get(userid=userid))
        i = 0
        toRes = {}
        for mes in messagesForUser:
            if(mes.adminreplyid != None):
                toRes[f'{i}'] = {
                    'MessageID':mes.messageid, 
                    'UserSenderID':userid,
                    'AdminReplyID':mes.adminreplyid.adminid,
                    'MessageText':mes.messagetext,
                    'MessageDateTime':mes.messagedatetime
                }
            i+=1
        print(toRes)
        return JsonResponse(toRes)
    elif(request.method == 'POST' and json.loads(request.body)['type'] == 'addMessageToDB'):
        body = json.loads(request.body)
        fromuser=body['userid']
        msg = body['message']
        newmsg = Supportchatlogging.objects.create(usersenderid=Users.objects.get(userid=fromuser), messagetext=f'{msg}', messagedatetime=datetime.now())
        newmsg.save()
        return JsonResponse({'status':'Попал сучёнок'})


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
        return JsonResponse({'userid': user.userid,'username': user.username, 'login': user.login, 'password': user.passwd, 'points': user.points})
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
        return JsonResponse({'userid': auser.adminid,'username': auser.username, 'login': auser.login, 'password': auser.password, 'adminAuth':True})
    
    