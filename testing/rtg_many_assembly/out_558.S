.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x8 , x0 , 4 
		add     x11 , x0 , x0 
		add     x16 , x0 , x0 
		addi    x15 , x0 , 72 
		addi    x5 , x0 , 2 
InArr:
		addi    x18 , x0 , 16 
		addi    x21 , x0 , 36 
		addi    x3 , x0 , 60 
		addi    x12 , x0 , 0 
		sh      x18 , 40 (x15) 
		sh      x21 , 44 (x15) 
		sh      x3 , 48 (x15) 
		sh      x12 , 52 (x15) 
Loop:
		sll     x4 , x16 , x5 
		add     x23 , x4 , x15 
		lhu     x24 , 40 (x23) 
		add     x11 , x11 , x24 
		addi    x16 , x16 , 1 
		beq     x16 , x8 , Result 
		jal     x0 , Loop 
Result:
		addi    x14 , x0 , 112 
		bne     x14 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
