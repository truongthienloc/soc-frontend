.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x17 , 3 
		lui     x20 , 9 
		lui     x16 , 5 
		lui     x29 , 7 
		sb      x4 , 8 (x17) 
		sb      x26 , 8 (x20) 
		sb      x25 , 8 (x16) 
		sb      x11 , 8 (x29) 
		lb      x18 , 8 (x29) 
		lb      x3 , 8 (x16) 
		lb      x24 , 8 (x20) 
		lb      x23 , 8 (x17) 
		bne     x23 , x4 , Fail
		bne     x24 , x26 , Fail
		bne     x3 , x25 , Fail
		bne     x18 , x11 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
