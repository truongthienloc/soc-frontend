.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x19 , 9
		auipc    x4 , 3
		auipc    x9 , 9
		auipc    x23 , 8
		lui      x29 , 6
		lui      x22 , 6
		lui      x31 , 9
		lui      x18 , 0
		sw       x21 , 92 (x19) 
		sw       x24 , 96 (x4) 
		sw       x5 , 100 (x9) 
		sw       x11 , 104 (x23) 
		sw       x14 , 108 (x29) 
		sw       x10 , 112 (x22) 
		sw       x27 , 116 (x31) 
		sw       x1 , 120 (x18) 
		lw       x28 , 120 (x18) 
		lw       x13 , 116 (x31) 
		lw       x17 , 112 (x22) 
		lw       x2 , 108 (x29) 
		lw       x30 , 104 (x23) 
		lw       x6 , 100 (x9) 
		lw       x20 , 96 (x4) 
		lw       x8 , 92 (x19) 
		bne      x8 , x21 , Fail
		bne      x20 , x24 , Fail
		bne      x6 , x5 , Fail
		bne      x30 , x11 , Fail
		bne      x2 , x14 , Fail
		bne      x17 , x10 , Fail
		bne      x13 , x27 , Fail
		bne      x28 , x1 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
