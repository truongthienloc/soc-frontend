.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x12 , x0 , 4 
		addi    x3 , x0 , 0 
		addi    x19 , x0 , 0 
		addi    x11 , x0 , 0 
InArr:
		addi    x14 , x0 , 32 
		addi    x2 , x0 , 68 
		addi    x13 , x0 , 76 
		addi    x30 , x0 , 72 
		sh      x14 , 8 (x11) 
		sh      x2 , 12 (x11) 
		sh      x13 , 16 (x11) 
		sh      x30 , 20 (x11) 
Loop:
		slli    x10 , x19 , 2 
		add     x5 , x10 , x11 
		lh      x29 , 8 (x5) 
		add     x3 , x3 , x29 
		addi    x19 , x19 , 1 
		beq     x19 , x12 , Result 
		jal     x0 , Loop 
Result:
		addi    x4 , x0 , 248 
		bne     x4 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
