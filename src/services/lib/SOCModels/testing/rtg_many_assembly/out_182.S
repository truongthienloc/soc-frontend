.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x28 , 0
		auipc    x6 , 1
		auipc    x23 , 7
		auipc    x2 , 3
		lui      x16 , 9
		lui      x4 , 6
		lui      x24 , 9
		lui      x1 , 5
		sw       x8 , 88 (x28) 
		sw       x21 , 92 (x6) 
		sw       x20 , 96 (x23) 
		sw       x9 , 100 (x2) 
		sw       x14 , 104 (x16) 
		sw       x18 , 108 (x4) 
		sw       x26 , 112 (x24) 
		sw       x13 , 116 (x1) 
		lw       x5 , 116 (x1) 
		lw       x22 , 112 (x24) 
		lw       x10 , 108 (x4) 
		lw       x31 , 104 (x16) 
		lw       x12 , 100 (x2) 
		lw       x17 , 96 (x23) 
		lw       x11 , 92 (x6) 
		lw       x3 , 88 (x28) 
		bne      x3 , x8 , Fail
		bne      x11 , x21 , Fail
		bne      x17 , x20 , Fail
		bne      x12 , x9 , Fail
		bne      x31 , x14 , Fail
		bne      x10 , x18 , Fail
		bne      x22 , x26 , Fail
		bne      x5 , x13 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
