.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x27 , 7 
		lui     x9 , 5 
		lui     x14 , 2 
		lui     x6 , 6 
		sw      x22 , 0 (x27) 
		sw      x10 , 4 (x9) 
		sw      x21 , 8 (x14) 
		sw      x30 , 12 (x6) 
		lw      x2 , 12 (x6) 
		lw      x31 , 8 (x14) 
		lw      x26 , 4 (x9) 
		lw      x3 , 0 (x27) 
		bne     x3 , x22 , Fail
		bne     x26 , x10 , Fail
		bne     x31 , x21 , Fail
		bne     x2 , x30 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
