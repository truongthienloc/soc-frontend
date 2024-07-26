.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x2 , x0 , 4 
		addi    x23 , x0 , 0 
		addi    x11 , x0 , 0 
		addi    x8 , x0 , 72 
InArr:
		addi    x10 , x0 , 16 
		addi    x21 , x0 , 64 
		addi    x31 , x0 , 24 
		addi    x17 , x0 , 44 
		sh      x10 , 40 (x8) 
		sh      x21 , 44 (x8) 
		sh      x31 , 48 (x8) 
		sh      x17 , 52 (x8) 
Loop:
		slli    x3 , x11 , 2 
		add     x30 , x3 , x8 
		lh      x4 , 40 (x30) 
		add     x23 , x23 , x4 
		addi    x11 , x11 , 1 
		beq     x11 , x2 , Result 
		jal     x0 , Loop 
Result:
		addi    x13 , x0 , 148 
		bne     x13 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
