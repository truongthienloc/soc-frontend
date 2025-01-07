.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x21 , 7 
		lui     x26 , 8 
		lui     x4 , 1 
		lui     x30 , 8 
		sb      x9 , 104 (x21) 
		sb      x6 , 104 (x26) 
		sb      x19 , 104 (x4) 
		sb      x29 , 104 (x30) 
		lb      x12 , 104 (x30) 
		lb      x18 , 104 (x4) 
		lb      x5 , 104 (x26) 
		lb      x17 , 104 (x21) 
		bne     x17 , x9 , Fail
		bne     x5 , x6 , Fail
		bne     x18 , x19 , Fail
		bne     x12 , x29 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
