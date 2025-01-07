.text

#The program checks the ALU instruction in I_type

Main:
		addi    x5 , x0 , -2048 
		addi    x22 , x0 , 199 
		sltu    x27 , x5 , x22 
		bltu    x5 , x22 , Less_i 
		bgeu    x5 , x22 , Bigger_i 
Less_i:
		ori     x24 , x5 , 80 
		sub     x3 , x22 , x5 
		srai    x3 , x3 , 0 
		and     x3 , x3 , x0 
		addi    x8 , x0 , 0 
		beq     x3 , x8 , Pass 
Bigger_i:
		ori     x24 , x5 , 130 
		sub     x3 , x22 , x5 
		srai    x3 , x3 , 0 
		and     x3 , x3 , x0 
		addi    x8 , x0 , 0 
		beq     x3 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
