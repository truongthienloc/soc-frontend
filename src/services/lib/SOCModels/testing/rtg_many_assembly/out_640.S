.text

#The program checks the ALU instruction in I_type

Main:
		addi    x23 , x0 , 43 
		addi    x22 , x0 , -2048 
		slti    x8 , x23 , 709 
		bltu    x23 , x22 , Less_i 
		bgeu    x23 , x22 , Bigger_i 
Less_i:
		ori     x20 , x23 , 71 
		sub     x13 , x22 , x23 
		srai    x13 , x13 , 3 
		and     x13 , x13 , x0 
		addi    x31 , x0 , 0 
		beq     x13 , x31 , Pass 
Bigger_i:
		ori     x20 , x23 , 15 
		sub     x13 , x22 , x23 
		srai    x13 , x13 , 0 
		and     x13 , x13 , x0 
		addi    x31 , x0 , 0 
		beq     x13 , x31 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
