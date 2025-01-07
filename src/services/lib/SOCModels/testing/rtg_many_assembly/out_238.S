.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x31 , x0 , 4 
		addi    x25 , x0 , 0 
		addi    x7 , x0 , 0 
		addi    x8 , x0 , 40 
InArr:
		addi    x29 , x0 , 56 
		addi    x9 , x0 , 76 
		addi    x3 , x0 , 28 
		addi    x15 , x0 , 48 
		sh      x29 , 60 (x8) 
		sh      x9 , 64 (x8) 
		sh      x3 , 68 (x8) 
		sh      x15 , 72 (x8) 
Loop:
		slli    x11 , x7 , 2 
		add     x12 , x11 , x8 
		lh      x19 , 60 (x12) 
		add     x25 , x25 , x19 
		addi    x7 , x7 , 1 
		beq     x7 , x31 , Result 
		jal     x0 , Loop 
Result:
		addi    x21 , x0 , 208 
		bne     x21 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
