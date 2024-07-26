.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , 110 
		addi    x23 , x0 , -2048 
		slti    x11 , x16 , 252 
		bltu    x16 , x23 , Less_i 
		bgeu    x16 , x23 , Bigger_i 
Less_i:
		ori     x8 , x16 , 147 
		sub     x1 , x23 , x16 
		srai    x1 , x1 , 2 
		and     x1 , x1 , x0 
		addi    x7 , x0 , 0 
		beq     x1 , x7 , Pass 
Bigger_i:
		ori     x8 , x16 , 68 
		sub     x1 , x23 , x16 
		srai    x1 , x1 , 4 
		and     x1 , x1 , x0 
		addi    x7 , x0 , 0 
		beq     x1 , x7 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
