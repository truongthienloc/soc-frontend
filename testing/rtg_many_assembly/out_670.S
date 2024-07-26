.text

#The program checks the ALU instruction in I_type

Main:
		addi    x10 , x0 , -2048 
		addi    x16 , x0 , 131 
		sltu    x6 , x10 , x16 
		bltu    x10 , x16 , Less_i 
		bgeu    x10 , x16 , Bigger_i 
Less_i:
		ori     x29 , x10 , 172 
		sub     x25 , x16 , x10 
		srai    x25 , x25 , 4 
		and     x25 , x25 , x0 
		addi    x8 , x0 , 0 
		beq     x25 , x8 , Pass 
Bigger_i:
		ori     x29 , x10 , 102 
		sub     x25 , x16 , x10 
		srai    x25 , x25 , 2 
		and     x25 , x25 , x0 
		addi    x8 , x0 , 0 
		beq     x25 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
