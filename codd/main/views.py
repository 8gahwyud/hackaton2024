from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def MainPage(request):
    # if(request.method == 'POST'):
    #     if (request.body != None):
    #         b = json.loads(request.body)
    #     if(b!=None):
    #         print(b['type'])
    #         if(b['type']=='Авторизация'):
    #             return render(request, 'mainpage.html', context={'auth':True})
    #         else:
    #             return render(request, 'mainpage.html', context={'auth':False})
    
    return render(request, 'mainpage.html')
    
def fvpPage(request):
    return render(request, 'favPath.html')
            
