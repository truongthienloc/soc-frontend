.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x20 , 2 
		lui     x25 , 6 
		lui     x9 , 5 
		lui     x14 , 0 
		sw      x13 , 96 (x20) 
		sw      x5 , 100 (x25) 
		sw      x31 , 104 (x9) 
		sw      x26 , 108 (x14) 
		lw      x17 , 108 (x14) 
		lw      x3 , 104 (x9) 
		lw      x4 , 100 (x25) 
		lw      x2 , 96 (x20) 
		bne     x2 , x13 , Fail
		bne     x4 , x5 , Fail
		bne     x3 , x31 , Fail
		bne     x17 , x26 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
