import CLC_FASD.models as models

def add_conn(name):
	new_entry = models.Connections(username=name)
	new_entry.save()