.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		addi    x13 , x0 , 0 
		addi    x6 , x0 , 0 
		addi    x23 , x0 , 40 
InArr:
		addi    x28 , x0 , 36 
		addi    x29 , x0 , 48 
		addi    x7 , x0 , 20 
		addi    x15 , x0 , 36 
		sh      x28 , 52 (x23) 
		sh      x29 , 56 (x23) 
		sh      x7 , 60 (x23) 
		sh      x15 , 64 (x23) 
Loop:
		slli    x21 , x6 , 2 
		add     x3 , x21 , x23 
		lh      x26 , 52 (x3) 
		add     x13 , x13 , x26 
		addi    x6 , x6 , 1 
		beq     x6 , x24 , Result 
		jal     x0 , Loop 
Result:
		addi    x27 , x0 , 140 
		bne     x27 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
