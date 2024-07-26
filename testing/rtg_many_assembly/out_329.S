.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x14 , x0 , 4 
		addi    x17 , x0 , 0 
		addi    x11 , x0 , 0 
		addi    x4 , x0 , 20 
InArr:
		addi    x29 , x0 , 0 
		addi    x10 , x0 , 72 
		addi    x13 , x0 , 28 
		addi    x12 , x0 , 60 
		sh      x29 , 20 (x4) 
		sh      x10 , 24 (x4) 
		sh      x13 , 28 (x4) 
		sh      x12 , 32 (x4) 
Loop:
		slli    x15 , x11 , 2 
		add     x25 , x15 , x4 
		lh      x21 , 20 (x25) 
		add     x17 , x17 , x21 
		addi    x11 , x11 , 1 
		beq     x11 , x14 , Result 
		jal     x0 , Loop 
Result:
		addi    x24 , x0 , 160 
		bne     x24 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
