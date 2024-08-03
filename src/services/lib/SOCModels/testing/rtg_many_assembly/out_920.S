.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , -2048 
		addi    x22 , x0 , 181 
		sltu    x25 , x24 , x22 
		bltu    x24 , x22 , Less_i 
		bgeu    x24 , x22 , Bigger_i 
Less_i:
		ori     x12 , x24 , 96 
		sub     x19 , x22 , x24 
		srai    x19 , x19 , 0 
		and     x19 , x19 , x0 
		addi    x8 , x0 , 0 
		beq     x19 , x8 , Pass 
Bigger_i:
		ori     x12 , x24 , 45 
		sub     x19 , x22 , x24 
		srai    x19 , x19 , 0 
		and     x19 , x19 , x0 
		addi    x8 , x0 , 0 
		beq     x19 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
