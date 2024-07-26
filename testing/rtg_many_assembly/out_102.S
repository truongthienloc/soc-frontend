.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 34 
		addi    x23 , x0 , -2048 
		slti    x5 , x28 , 416 
		bltu    x28 , x23 , Less_i 
		bgeu    x28 , x23 , Bigger_i 
Less_i:
		ori     x25 , x28 , 10 
		sub     x29 , x23 , x28 
		srai    x29 , x29 , 1 
		and     x29 , x29 , x0 
		addi    x8 , x0 , 0 
		beq     x29 , x8 , Pass 
Bigger_i:
		ori     x25 , x28 , 10 
		sub     x29 , x23 , x28 
		srai    x29 , x29 , 4 
		and     x29 , x29 , x0 
		addi    x8 , x0 , 0 
		beq     x29 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
