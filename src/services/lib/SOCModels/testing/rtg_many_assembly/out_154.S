.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x3 , 7
		auipc    x11 , 6
		auipc    x31 , 1
		auipc    x28 , 2
		lui      x8 , 4
		lui      x17 , 8
		lui      x15 , 7
		lui      x1 , 4
		sw       x12 , 92 (x3) 
		sw       x30 , 96 (x11) 
		sw       x21 , 100 (x31) 
		sw       x5 , 104 (x28) 
		sw       x25 , 108 (x8) 
		sw       x18 , 112 (x17) 
		sw       x20 , 116 (x15) 
		sw       x26 , 120 (x1) 
		lw       x4 , 120 (x1) 
		lw       x19 , 116 (x15) 
		lw       x23 , 112 (x17) 
		lw       x9 , 108 (x8) 
		lw       x2 , 104 (x28) 
		lw       x14 , 100 (x31) 
		lw       x27 , 96 (x11) 
		lw       x24 , 92 (x3) 
		bne      x24 , x12 , Fail
		bne      x27 , x30 , Fail
		bne      x14 , x21 , Fail
		bne      x2 , x5 , Fail
		bne      x9 , x25 , Fail
		bne      x23 , x18 , Fail
		bne      x19 , x20 , Fail
		bne      x4 , x26 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
