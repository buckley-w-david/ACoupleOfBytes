from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'login/$', views.login, name='login'),
    url(r'logout/$', views.logout, name='logout'),
    url(r'signup/$', views.signup, name='signup'),
    url(r'meds/$', views.meds, name='meds'),
    url(r'meds/(\d+)/$', views.med, name='med'),
    url(r'meds/due/$', views.due_meds, name='due'),
    url(r'meds/next/$', views.next_meds, name='next'),
    url(r'meds/take/(\d+)/$', views.take, name='take')
]
