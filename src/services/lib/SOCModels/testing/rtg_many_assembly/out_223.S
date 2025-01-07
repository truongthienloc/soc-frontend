.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x16 , 9 
		lui     x15 , 9 
		lui     x8 , 8 
		lui     x10 , 7 
		sw      x24 , 20 (x16) 
		sw      x20 , 24 (x15) 
		sw      x14 , 28 (x8) 
		sw      x7 , 32 (x10) 
		lw      x11 , 32 (x10) 
		lw      x22 , 28 (x8) 
		lw      x5 , 24 (x15) 
		lw      x27 , 20 (x16) 
		bne     x27 , x24 , Fail
		bne     x5 , x20 , Fail
		bne     x22 , x14 , Fail
		bne     x11 , x7 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
