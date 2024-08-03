.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , -2048 
		addi    x1 , x0 , 189 
		sltu    x22 , x27 , x1 
		bltu    x27 , x1 , Less_i 
		bgeu    x27 , x1 , Bigger_i 
Less_i:
		ori     x23 , x27 , 190 
		sub     x8 , x1 , x27 
		srai    x8 , x8 , 0 
		and     x8 , x8 , x0 
		addi    x13 , x0 , 0 
		beq     x8 , x13 , Pass 
Bigger_i:
		ori     x23 , x27 , 157 
		sub     x8 , x1 , x27 
		srai    x8 , x8 , 1 
		and     x8 , x8 , x0 
		addi    x13 , x0 , 0 
		beq     x8 , x13 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
