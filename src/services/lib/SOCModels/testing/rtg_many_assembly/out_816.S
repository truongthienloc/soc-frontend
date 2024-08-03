.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x15 , x0 , 4 
		addi    x26 , x0 , 0 
		addi    x21 , x0 , 0 
		addi    x23 , x0 , 28 
InArr:
		addi    x2 , x0 , 12 
		addi    x18 , x0 , 24 
		addi    x17 , x0 , 76 
		addi    x16 , x0 , 36 
		sh      x2 , 48 (x23) 
		sh      x18 , 52 (x23) 
		sh      x17 , 56 (x23) 
		sh      x16 , 60 (x23) 
Loop:
		slli    x20 , x21 , 2 
		add     x10 , x20 , x23 
		lh      x14 , 48 (x10) 
		add     x26 , x26 , x14 
		addi    x21 , x21 , 1 
		beq     x21 , x15 , Result 
		jal     x0 , Loop 
Result:
		addi    x31 , x0 , 148 
		bne     x31 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
